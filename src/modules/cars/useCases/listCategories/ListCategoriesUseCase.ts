import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    execute(): Promise<Category[]> {
        return this.categoriesRepository.list();
    }
}

export { ListCategoriesUseCase }