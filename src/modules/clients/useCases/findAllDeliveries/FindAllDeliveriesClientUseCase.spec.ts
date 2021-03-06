import { Clients } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../deleteClient/DeleteClientUseCase";
import { FindAllDeliveriesClientUseCase } from "./FindAllDeliveriesClientUseCase";

let createClientUseCase: CreateClientUseCase;
let findAllDeliveriesUseCase: FindAllDeliveriesClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let client: ICreateClient
let clientCreated: Clients

describe("Find All Client Deliveries", () => {
    beforeEach(() => {
        createClientUseCase = new CreateClientUseCase();
        findAllDeliveriesUseCase = new FindAllDeliveriesClientUseCase();        

        client = {
            username: "FindAllClientDeliveries",
            password: "FindAllClientDeliveries", 
        };

    });

    it("should be able to show all client deliveries", async () => {
        clientCreated = await createClientUseCase.execute(client);

        const findAllDeliveries = await findAllDeliveriesUseCase.execute(clientCreated.id);

        expect(findAllDeliveries).toEqual([{deliveries: [], id: clientCreated.id, username: clientCreated.username}]);
    });

    afterAll(async () => {
        deleteClientUseCase = new DeleteClientUseCase();
        await deleteClientUseCase.execute(clientCreated.id);
    });
});