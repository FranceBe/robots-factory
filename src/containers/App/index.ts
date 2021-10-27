// Use index file to export both named and default import
// So the main component is declared in a specific file, not in index
import AppContainer, { App } from 'containers/App/App.container'

export { App }

export default AppContainer
