import { Container } from "inversify";
import { networkModule } from "./containers/network/networkcontainer.module";
import { repositoryModule } from "./containers/repositories/repositorycontainer.module";
import { usecasesModule } from "./containers/usecases/usecasescontainer.module";

// Contenedor principal
const appContainer = new Container();
appContainer.load(networkModule);
appContainer.load(repositoryModule);
appContainer.load(usecasesModule);
export { appContainer };
