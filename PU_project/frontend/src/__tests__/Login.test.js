import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../components/Login';
import APIService from "../APIService";

jest.mock("../APIService");

describe("Login component", () => {
  it("should render correctly", () => {
    render(<Login />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should show an error alert if the login fails", async () => {
    const errorMessage = "Use your muscles to type in the correct information!";
    APIService.LoginUser.mockRejectedValueOnce(new Error(errorMessage));
    render(<Login />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should redirect to the home page if the login is successful", async () => {
    const token = "testtoken";
    APIService.LoginUser.mockResolvedValueOnce({ ok: true, token });
    render(<Login />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });
});