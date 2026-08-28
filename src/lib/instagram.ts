import { cache } from "react";
import { MOSAIC_TILES, type MosaicMediaKind, type MosaicTile } from "@/lib/site";

export const INSTAGRAM_PROFILES = [
  "officialwoahna",
  "capturingallangles",
] as const;

const GRAPH_BASES = [
  "https://graph.instagram.com/v23.0",
  "https://graph.facebook.com/v23.0",
] as const;

const MEDIA_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
  "username",
  "children{id,media_type,media_url,thumbnail_url}",
].join(",");

type IgMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

type IgMediaNode = {
  id: string;
  caption?: string;
  media_type?: IgMediaType;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
  children?: { data?: IgMediaNode[] };
};

type IgListResponse = {
  data?: IgMediaNode[];
  paging?: { next?: string };
  error?: { message?: string };
};

type IgMeResponse = {
  id?: string;
  user_id?: string;
  username?: string;
  error?: { message?: string };
};

type IgDiscoveryResponse = {
  business_discovery?: { media?: { data?: IgMediaNode[] } };
  error?: { message?: string };
};

type TokenConfig = {
  username?: string;
  token: string;
};

export type InstagramMedia = {
  id: string;
  src: string;
  kind: MosaicMediaKind;
  poster?: string;
  username?: string;
};

function configuredTokens(): TokenConfig[] {
  const named: TokenConfig[] = [
    {
      username: "officialwoahna",
      token: process.env.INSTAGRAM_TOKEN_OFFICIALWOAHNA ?? "",
    },
    {
      username: "capturingallangles",
      token: process.env.INSTAGRAM_TOKEN_CAPTURINGALLANGLES ?? "",
    },
  ].filter((entry) => entry.token);

  const seen = new Set(named.map((entry) => entry.token));
  const generic = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (generic && !seen.has(generic)) {
    named.push({ token: generic });
  }

  return named;
}

async function fetchJson<T extends { error?: { message?: string } }>(
  url: string,
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 1800, tags: ["instagram"] },
      headers: { Accept: "application/json" },
    });
    return (await response.json()) as T;
  } catch (error) {
    console.error("[instagram] request failed", error);
    return null;
  }
}

function mediaListUrl(base: string, id: string, token: string) {
  const url = new URL(`${base}/${id}/media`);
  url.searchParams.set("fields", MEDIA_FIELDS);
  url.searchParams.set("limit", "24");
  url.searchParams.set("access_token", token);
  return url;
}

function flattenMedia(nodes: IgMediaNode[], username?: string): InstagramMedia[] {
  const items: InstagramMedia[] = [];

  for (const node of nodes) {
    const owner = node.username ?? username;
    if (node.media_type === "CAROUSEL_ALBUM") {
      for (const child of node.children?.data ?? []) {
        const mapped = toMedia(child, owner);
        if (mapped) items.push(mapped);
      }
      continue;
    }

    const mapped = toMedia(node, owner);
    if (mapped) items.push(mapped);
  }

  return items;
}

function toMedia(node: IgMediaNode, username?: string): InstagramMedia | null {
  if (node.media_type === "VIDEO") {
    if (node.media_url) {
      return {
        id: node.id,
        src: node.media_url,
        kind: "video",
        poster: node.thumbnail_url,
        username,
      };
    }
    if (node.thumbnail_url) {
      return {
        id: node.id,
        src: node.thumbnail_url,
        kind: "image",
        username,
      };
    }
    return null;
  }

  if (!node.media_url) return null;

  return {
    id: node.id,
    src: node.media_url,
    kind: "image",
    username,
  };
}

async function fetchMediaForToken(config: TokenConfig): Promise<{
  items: InstagramMedia[];
  username?: string;
  userId?: string;
  base?: string;
  token: string;
}> {
  for (const base of GRAPH_BASES) {
    const me = await fetchJson<IgMeResponse>(
      `${base}/me?fields=id,user_id,username&access_token=${encodeURIComponent(config.token)}`,
    );
    if (!me || me.error || !(me.id || me.user_id)) continue;

    const username = me.username ?? config.username;
    const candidateIds = [me.user_id, me.id].filter(
      (value, index, all): value is string =>
        Boolean(value) && all.indexOf(value) === index,
    );

    for (const userId of candidateIds) {
      const list = await fetchJson<IgListResponse>(
        mediaListUrl(base, userId, config.token).toString(),
      );
      if (!list || list.error) {
        if (list?.error?.message) {
          console.error("[instagram] media error", list.error.message);
        }
        continue;
      }

      return {
        items: flattenMedia(list.data ?? [], username),
        username,
        userId,
        base,
        token: config.token,
      };
    }
  }

  return { items: [], token: config.token };
}

async function fetchViaBusinessDiscovery(
  base: string,
  token: string,
  userId: string,
  username: string,
): Promise<InstagramMedia[]> {
  const url = new URL(`${base}/${userId}`);
  url.searchParams.set(
    "fields",
    `business_discovery.username(${username}){media.limit(24){${MEDIA_FIELDS}}}`,
  );
  url.searchParams.set("access_token", token);

  const json = await fetchJson<IgDiscoveryResponse>(url.toString());
  if (!json || json.error) {
    if (json?.error?.message) {
      console.error("[instagram] discovery error", json.error.message);
    }
    return [];
  }

  return flattenMedia(json.business_discovery?.media?.data ?? [], username);
}

function interleave(groups: InstagramMedia[][]): InstagramMedia[] {
  const out: InstagramMedia[] = [];
  const seen = new Set<string>();
  const max = Math.max(0, ...groups.map((group) => group.length));

  for (let i = 0; i < max; i++) {
    for (const group of groups) {
      const item = group[i];
      if (!item || seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
  }

  return out;
}

export const fetchInstagramMedia = cache(async (): Promise<InstagramMedia[]> => {
  const tokens = configuredTokens();
  if (tokens.length === 0) return [];

  const results = await Promise.all(tokens.map((entry) => fetchMediaForToken(entry)));
  const byUsername = new Map<string, InstagramMedia[]>();
  const discoverySources: { token: string; userId: string; base: string }[] = [];

  for (const result of results) {
    if (result.userId && result.base) {
      discoverySources.push({
        token: result.token,
        userId: result.userId,
        base: result.base,
      });
    }

    const resolved = (
      result.username ?? result.items[0]?.username
    )?.toLowerCase();

    if (resolved) {
      byUsername.set(resolved, result.items);
    } else if (result.items.length > 0) {
      byUsername.set(`token-${byUsername.size}`, result.items);
    }
  }

  const missing = INSTAGRAM_PROFILES.filter(
    (username) => !byUsername.has(username),
  );

  if (missing.length > 0 && discoverySources[0]) {
    const source = discoverySources[0];
    const discovered = await Promise.all(
      missing.map((username) =>
        fetchViaBusinessDiscovery(
          source.base,
          source.token,
          source.userId,
          username,
        ),
      ),
    );
    missing.forEach((username, index) => {
      if (discovered[index].length > 0) {
        byUsername.set(username, discovered[index]);
      }
    });
  }

  const groups = INSTAGRAM_PROFILES.map(
    (username) => byUsername.get(username) ?? [],
  ).filter((group) => group.length > 0);

  if (groups.length === 0) {
    return [...byUsername.values()].flat();
  }

  return interleave(groups);
});

export const getHomepageTiles = cache(async (): Promise<MosaicTile[]> => {
  const media = await fetchInstagramMedia();
  if (media.length === 0) {
    return MOSAIC_TILES.map((tile) => ({ ...tile, kind: "video" as const }));
  }

  return MOSAIC_TILES.map((tile, index) => {
    const item = media[index % media.length];
    return {
      ...tile,
      src: item.src,
      kind: item.kind,
      poster: item.poster,
    };
  });
});
