import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[];

    constructor(){
        this.categories = [];
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.categories.find(category => category.name === name);
        return category;
    }

    async list(): Promise<Category[]> {
        return await this.categories;
    }
    
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {name, description})

        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory }