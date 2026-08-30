import { DashboardIcon } from '@sanity/icons/Dashboard';
import { ImageIcon } from '@sanity/icons/Image';
import { PlayIcon } from '@sanity/icons/Play';
import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = new Set([
  'photographyGallery',
  'videographyPage',
  'homeMosaic',
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Galleries')
    .items([
      S.listItem()
        .title('Photography')
        .icon(ImageIcon)
        .child(
          S.document()
            .schemaType('photographyGallery')
            .documentId('photographyGallery')
            .title('Photography'),
        ),
      S.listItem()
        .title('Videography')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('videographyPage')
            .documentId('videographyPage')
            .title('Videography'),
        ),
      S.listItem()
        .title('Home mosaic')
        .icon(DashboardIcon)
        .child(
          S.document()
            .schemaType('homeMosaic')
            .documentId('homeMosaic')
            .title('Home mosaic'),
        ),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.has(item.getId() ?? ''),
      ),
    ]);
