import App from "./App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("check rendering ToDo List", () => {
    render(<App />)

   const title = screen.getByText('ToDo List')

   expect(title).toBeInTheDocument();
})

test("shows error if trying to add empty task", async () => {
  render(<App />);

  const addButton = screen.getByRole("button", { name: 'Add'})

  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText("You have to write smth first")).toBeInTheDocument()
  })
})

test("input accepts both letters and numbers", () => {
  render(<App />)
  
  const input = screen.getByPlaceholderText('Enter a task')

  fireEvent.change(input, { target: { value: "t1e2s3t4" } })

  expect(input.value).toBe("t1e2s3t4");
})

test("add new task to the list", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Enter a task')
  const addButton = screen.getByRole("button", { name: 'Add' })

  fireEvent.change(input, { target: { value: "New Task" } })

  fireEvent.click(addButton)

  await waitFor(() => {
    expect(screen.getByText("New Task")).toBeInTheDocument()
  })
})


test("check input after submitting become empty", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Enter a task')
  const addButton = screen.getByRole("button", { name: 'Add' })

  fireEvent.change(input, { target: { value: "New Task" } })

  fireEvent.click(addButton)

  await waitFor(() => {
    expect(input.value).toBe("")
  })
})