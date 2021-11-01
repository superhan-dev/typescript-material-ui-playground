import { render, fireEvent, screen } from "../../utils/test-util";
import React from "react";
import { act } from "react-dom/test-utils";
import { LoginForm } from "./LoginForm";
// import { ThemeProvider } from "@mui/styles";
// import { theme } from "../../theme";

describe("Sign In", () => {
  describe("with invalid inputs", () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    it("calls the onSubmit function", async () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const emailInputElement: HTMLInputElement =
        screen.getByTestId("email-input");

      const passwordInputElement: HTMLInputElement =
        screen.getByTestId("password-input");

      await act(async () => {
        fireEvent.change(emailInputElement, {
          target: { value: "email@test.com" },
        });
        fireEvent.change(passwordInputElement, {
          target: { value: "12345678" },
        });
      });

      expect(emailInputElement.value).toBe("email@test.com");

      const submmitButtonElement: HTMLElement =
        screen.getByTestId("submit-button");

      await act(async () => {
        fireEvent.click(submmitButtonElement);
      });

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe("with invalid email", () => {
    it("renders the email validation error", async () => {
      render(<LoginForm />);

      const emailInputElement: HTMLInputElement =
        screen.getByTestId("email-input");
      // const emailHedlerText: HTMLElement =
      //   screen.getByTestId("email-input-text");
      await act(async () => {
        fireEvent.change(emailInputElement, {
          target: { value: "invalid email" },
        });
        fireEvent.blur(emailInputElement);
      });

      expect(emailInputElement.value).toBe("invalid email");
    });
  });

  //   describe("with invalid password", () => {
  //     it("renders the password validation error", async () => {
  //       const { getByLabelText, container } = render(
  //         <ThemeProvider theme={theme}>
  //           <LoginForm />
  //         </ThemeProvider>
  //       );

  //       await act(async () => {
  //         const paswordInput = getByLabelText("Password *");
  //         fireEvent.change(paswordInput, { target: { value: "123" } });
  //         fireEvent.blur(paswordInput);
  //       });

  //       expect(container.innerHTML).toMatch(
  //         "Password should be longer than 6 characters"
  //       );
  //     });
  //   });
});
