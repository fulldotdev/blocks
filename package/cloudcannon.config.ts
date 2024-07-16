export default {
  paths: {
    uploads: 'public',
    static: 'public',
    uploads_filename: null,
    collections: null,
  },
  collections_config: {
    pages: {
      path: 'src/content/pages',
      output: true,
      url: '/[full_slug]/',
      name: "Pagina's",
      icon: 'wysiwyg',
      _enabled_editors: ['visual', 'content'],
      schemas: {
        default: {
          path: 'src/schemas/page.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        '404': {
          path: 'src/schemas/404.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        page: {
          path: 'src/schemas/page.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        contact: {
          path: 'src/schemas/contact.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        post: {
          path: 'src/schemas/post.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        policy: {
          path: 'src/schemas/policy.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        overview: {
          path: 'src/schemas/overview.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
        entry: {
          path: 'src/schemas/entry.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
      },
    },
    products: {
      path: 'src/content/products',
      output: true,
      url: '/producten/[full_slug]/',
      name: 'Producten',
      icon: 'shopping_cart',
      _enabled_editors: ['content', 'visual'],
      schemas: {
        default: {
          path: 'src/schemas/product.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
      },
    },
    categories: {
      path: 'src/content/categories',
      output: true,
      url: '/categorieen/[full_slug]/',
      name: 'Categorieën',
      icon: 'category',
      _enabled_editors: ['content', 'visual'],
      schemas: {
        default: {
          path: 'src/schemas/category.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
      },
    },
    reviews: {
      path: 'src/content/reviews',
      output: false,
      name: 'Reviews',
      icon: 'reviews',
      _enabled_editors: ['data'],
      disable_add_folder: true,
      schemas: {
        default: {
          path: 'src/schemas/review.md',
          hide_extra_inputs: true,
          remove_empty_inputs: true,
        },
      },
    },
    globals: {
      path: 'src/content/globals',
      output: false,
      name: 'Globale data',
      icon: 'grid_view',
      _enabled_editors: ['data'],
      disable_add: true,
      disable_file_actions: true,
      disable_add_folder: true,
      // TODO header, footer etc schemas
      schemas: {
        default: {
          hide_extra_inputs: true,
          remove_empty_inputs: true,
          icon: 'notes',
          _editables: null,
          _inputs: null,
          _select_data: null,
          _structures: null,
        },
      },
    },
  },
  collection_groups: [
    {
      heading: 'Pages',
      collections: ['pages', 'posts', 'products', 'categories'],
    },
    {
      heading: 'Data',
      collections: ['reviews', 'globals'],
    },
  ],
  _inputs: {
    title: {
      label: 'Titel',
    },
    description: {
      label: 'Beschrijving',
    },
    text: {
      type: 'textarea',
      label: 'Tekst',
    },
    href: {
      type: 'url',
      label: 'Link',
    },
    'meta.title': {
      type: 'auto',
      label: 'Titel',
      comment: 'Zichtbaar in Google',
    },
    meta: {
      label: 'SEO / Meta data',
    },
    'meta.description': {
      type: 'auto',
      label: 'Beschrijving',
      comment: 'Zichtbaar in Google',
    },
    'meta.image': {
      type: 'image',
      label: 'Afbeelding',
      comment: 'Zichtbaar wanneer je een linkje van de pagina deelt',
      options: {
        mime_type: 'image/png',
        resize_style: 'contain',
        width: 1200,
        height: 640,
      },
    },
    image: {
      type: 'image',
      label: 'Afbeelding',
      options: {
        mime_type: 'image/webp',
        resize_style: 'contain',
        width: 1920,
        height: 1920,
      },
    },
    images: {
      type: 'array',
      cascade: true,
    },
    'images[*]': {
      type: 'image',
      options: {
        mime_type: 'image/webp',
        resize_style: 'contain',
        width: 1920,
        height: 1920,
      },
    },
    logo: {
      type: 'image',
      cascade: true,
      options: {
        mime_type: 'image/webp',
        resize_style: 'contain',
        width: 260,
        height: 32,
      },
    },
    rating: {
      type: 'range',
      options: {
        min: 0,
        max: 5,
        step: 0.1,
      },
      label: 'Rating',
      cascade: true,
    },
    draft: {
      type: 'switch',
      label: 'Concept',
      cascade: true,
    },
    price: {
      type: 'number',
      cascade: true,
    },
  },
  _structures: {
    blocks: {
      remove_empty_inputs: true,
      style: 'modal',
    },
  },
  _editables: {
    content: {
      allow_custom_markup: false,
      remove_custom_markup: false,
      bold: true,
      bulletedlist: true,
      format: 'p h1 h2 h3 h4 h5 h6',
      image: true,
      image_size_attributes: true,
      italic: true,
      link: true,
      numberedlist: true,
      redo: true,
      table: true,
      underline: true,
      undo: true,
    },
  },
  timezone: 'Europe/Amsterdam',
}
