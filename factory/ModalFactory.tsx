import RecipeModal from "../modal/RecipeModal";

const ModalFactory = (modal:string|null) => {

    switch(modal) {
        case RECIPE_MODAL:
            return <RecipeModal />
        default:
            return null;
    }
}

export const RECIPE_MODAL = "RECIPE_MODAL";

export default ModalFactory;