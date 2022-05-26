import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {

    constructor(private specificationRepository: ISpecificationRepository){
        this.specificationRepository = specificationRepository;
    }

    execute({ name, description }: IRequest){

        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepository.create({name, description})
    }
}

export {CreateSpecificationUseCase}