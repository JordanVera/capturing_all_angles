import { defineArrayMember, defineField, defineType } from 'sanity';

export const homeMosaic = defineType({
  name: 'homeMosaic',
  title: 'Home mosaic',
  type: 'document',
  fields: [
    defineField({
      name: 'clips',
      title: 'Mosaic clips',
      type: 'array',
      description:
        'Looping clips on the home mosaic. Order matches the existing layout (up to 16 tiles). Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'clip',
          title: 'Clip',
          fields: [
            defineField({
              name: 'video',
              title: 'Video file',
              type: 'file',
              options: { accept: 'video/*' },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { filename: 'video.asset.originalFilename' },
            prepare({ filename }) {
              return { title: filename || 'Mosaic clip' };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home mosaic' };
    },
  },
});
