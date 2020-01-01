import songRoutes from "./songs/routes";
import styleRoutes from "./styles/routes";
import bandRoutes from "./bands/routes";


export default [...styleRoutes, ...songRoutes, ...bandRoutes];

