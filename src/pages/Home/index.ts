// Use index file to export both named and default import
// So the main component is declared in a specific file, not in index
import HomeDefault, { Home } from 'pages/Home/Home.page'

export { Home }

export default HomeDefault
