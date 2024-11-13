import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MenuCentral } from '../components/menu-central/MenuCentral'
import axios from "axios";

jest.mock("axios");
jest.mock("react-hot-toast", () => ({
    toast: { success: jest.fn(), error: jest.fn() }
}));

describe("Test MenuCentral Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component without crashing", () => {
        render(<MenuCentral />);
        expect(screen.getByText("Información")).toBeInTheDocument();
    });

    it("should open the add information dialog when the add icon is clicked", () => {
        render(<MenuCentral />);
        fireEvent.click(screen.getByTitle("Añadir nueva información"));
        expect(screen.getByText("Añadir información")).toBeInTheDocument();
    });


    it("should show an error if required fields are missing on submit", async () => {
        render(<MenuCentral />);
        fireEvent.click(screen.getByTitle("Añadir nueva información"));

        // Intenta enviar sin completar campos
        fireEvent.click(screen.getByText("Aceptar"));
        await waitFor(() => expect(screen.getByText("Todos los campos son obligatorios")).toBeInTheDocument());
    });


    it("should call initInfoCentral on mount", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        render(<MenuCentral />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/info");
        });
    });

   

});