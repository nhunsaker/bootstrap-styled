// P5 example pages — showcase / parity-harness compositions.
//
// These are NOT part of the public API: `src/index.ts` deliberately does not
// re-export them, so tsup (entry = src/index.ts) never bundles them into the
// published package. This barrel exists only for internal consumers — the parity
// fixtures, the Ladle stories, and anyone browsing the example set — to import
// every styled page and its raw-Bootstrap native twin from one place.
export { Headers } from './headers/Headers'
export { HeadersNative } from './headers/Headers.native'
export { Heroes } from './heroes/Heroes'
export { HeroesNative } from './heroes/Heroes.native'
export { Features } from './features/Features'
export { FeaturesNative } from './features/Features.native'
export { Jumbotron } from './jumbotron/Jumbotron'
export { JumbotronNative } from './jumbotron/Jumbotron.native'
export { Navbars } from './navbars/Navbars'
export { NavbarsNative } from './navbars/Navbars.native'
export { Sidebar } from './sidebars/Sidebar'
export { SidebarNative } from './sidebars/Sidebar.native'
export { Footers } from './footers/Footers'
export { FootersNative } from './footers/Footers.native'
export { KitchenSink } from './kitchen-sink/KitchenSink'
export { KitchenSinkNative } from './kitchen-sink/KitchenSink.native'
