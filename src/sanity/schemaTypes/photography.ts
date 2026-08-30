import { defineArrayMember, defineField, defineType } from 'sanity';

export const photographyGallery = defineType({
  name: 'photographyGallery',
  title: 'Photography',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery photos',
      type: 'array',
      description: 'Drag to reorder. These stills appear on the Photography page.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Short description for accessibility.',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Photography gallery' };
    },
  },
});
