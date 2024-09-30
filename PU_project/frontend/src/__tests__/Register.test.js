import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from '../components/Register';
import APIService from "../APIService";
import { unmountComponentAtNode } from "react-dom";

jest.mock("../APIService");

describe("Register component", () => {

  it("should render correctly", () => {
    render(<Register />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should show an error alert if the registration fails", async () => {
    const errorMessage = "Use your muscles to type in the correct information!";
    APIService.LoginUser.mockRejectedValueOnce(new Error(errorMessage));
    render(<Register />);

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

  it("should show an error alert if the password is too short", async () => {
    const errorMessage = "Use your muscles to type in the correct information!";
    APIService.LoginUser.mockRejectedValueOnce(new Error(errorMessage));
    render(<Register />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    // this password should throw exception for being too short
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "abc" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should show an error alert if the password is only numbers", async () => {
    const errorMessage = "Use your muscles to type in the correct information!";
    APIService.LoginUser.mockRejectedValueOnce(new Error(errorMessage));
    render(<Register />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    // this password should throw exception for being too short
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should show an error alert if the password is the same as the username", async () => {
    const errorMessage = "Use your muscles to type in the correct information!";
    APIService.LoginUser.mockRejectedValueOnce(new Error(errorMessage));
    render(<Register />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    // this password should throw exception for being too short
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testuser" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should redirect to the home page if the registration is successful", async () => {
    const token = "testtoken";
    APIService.LoginUser.mockResolvedValueOnce({ ok: true, token });
    render(<Register />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

});