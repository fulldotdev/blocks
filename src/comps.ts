import { mapKeys, mapValues } from 'radash'
import PackageBanner from './blocks/banner/Banner.astro'
import PackageCategories from './blocks/Categories.astro'
import PackageEmployees from './blocks/Colleagues.astro'
import PackageContact from './blocks/Contact.astro'
import PackageContent from './blocks/Content.astro'
import PackageCta from './blocks/Cta.astro'
import PackageFeatures from './blocks/Features.astro'
import PackageFooter from './blocks/Footer.astro'
import PackageHeader from './blocks/Header.astro'
import PackageHero from './blocks/Hero.astro'
import PackageJobDeck from './blocks/JobDeck.astro'
import PackageLogos from './blocks/Logos.astro'
import PackageMasterCard from './blocks/MasterCard.astro'
import PackageMasterSection from './blocks/MasterSection.astro'
import PackagePosts from './blocks/Posts.astro'
import PackagePrices from './blocks/Prices.astro'
import PackageProduct from './blocks/Product.astro'
import PackageProducts from './blocks/Products.astro'
import PackageReviews from './blocks/Reviews.astro'
import PackageStats from './blocks/Stats.astro'
import PackageBlock from './components/Block.astro'
import PackageBlocks from './components/Blocks.astro'
import PackageGallery from './components/Gallery.astro'
import PackageImage from './components/Image.astro'
import PackageLayout from './layouts/Layout.astro'
import PackageMainLayout from './layouts/MainLayout.astro'

const baseComponents = {
  Block: PackageBlock,
  Blocks: PackageBlocks,
  Gallery: PackageGallery,
  Image: PackageImage,
  Banner: PackageBanner,
  Categories: PackageCategories,
  Employees: PackageEmployees,
  Contact: PackageContact,
  Content: PackageContent,
  Cta: PackageCta,
  Features: PackageFeatures,
  Footer: PackageFooter,
  Header: PackageHeader,
  Hero: PackageHero,
  JobDeck: PackageJobDeck,
  Logos: PackageLogos,
  Posts: PackagePosts,
  Prices: PackagePrices,
  Product: PackageProduct,
  Products: PackageProducts,
  Reviews: PackageReviews,
  Stats: PackageStats,
  Layout: PackageLayout,
  MainLayout: PackageMainLayout,
  MasterCard: PackageMasterCard,
  MasterSection: PackageMasterSection,
} as const

let userComponents = import.meta.glob('/src/components/**/*.astro', {
  eager: true,
})

userComponents = mapKeys(userComponents, (key: any) =>
  key.split('/').pop().split('.').shift()
)

userComponents = mapValues(userComponents, (value: any) => value.default)

export const {
  Image,
  Block,
  Blocks,
  Gallery,
  Banner,
  Categories,
  Employees,
  Contact,
  Content,
  Cta,
  Features,
  Footer,
  Header,
  Hero,
  JobDeck,
  Logos,
  Posts,
  Prices,
  Product,
  Products,
  Reviews,
  Stats,
  Layout,
  MainLayout,
  MasterCard,
  MasterSection,
} = {
  ...baseComponents,
  ...userComponents,
}
