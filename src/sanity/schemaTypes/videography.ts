import { defineArrayMember, defineField, defineType } from 'sanity';

export const videographyPage = defineType({
  name: 'videographyPage',
  title: 'Videography',
  type: 'document',
  fields: [
    defineField({
      name: 'films',
      title: 'Films',
      type: 'array',
      description:
        'YouTube films on the Videography page. The first item is the featured video.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'film',
          title: 'Film',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'youtubeId',
              title: 'YouTube URL or ID',
              type: 'string',
              description:
                'Paste a full YouTube or Shorts URL, or just the video ID.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title', youtubeId: 'youtubeId', location: 'location' },
            prepare({ title, youtubeId, location }) {
              return {
                title: title || 'Untitled film',
                subtitle: [location, youtubeId].filter(Boolean).join(' · '),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'shorts',
      title: 'Shorts',
      type: 'array',
      description:
        'Vertical clips in the shorts row. Optional YouTube ID adds a “watch on YouTube” link.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'short',
          title: 'Short',
          fields: [
            defineField({
              name: 'video',
              title: 'Video file',
              type: 'file',
              options: { accept: 'video/*' },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Short', value: 'short' },
                  { title: 'Clip', value: 'clip' },
                ],
                layout: 'radio',
              },
              initialValue: 'short',
            }),
            defineField({
              name: 'youtubeId',
              title: 'YouTube URL or ID',
              type: 'string',
              description: 'Optional. Used for the YouTube link under the clip.',
            }),
          ],
          preview: {
            select: { kind: 'kind', youtubeId: 'youtubeId' },
            prepare({ kind, youtubeId }) {
              return {
                title: kind === 'clip' ? 'Clip' : 'Short',
                subtitle: youtubeId || 'Uploaded file',
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Videography' };
    },
  },
});
