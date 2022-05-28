import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    execute(): Promise<Category[]> {
        return this.categoriesRepository.list();
    }
}

export { ListCategoriesUseCase }