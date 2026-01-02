import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEntry from '@/app/components/AddEntry';
import * as utils from '@/app/utils';

// Mock the utils module
jest.mock('@/app/utils', () => ({
  addEntry: jest.fn(),
}));

describe('AddEntry Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with all required fields', () => {
    render(<AddEntry onAdd={mockOnAdd} />);

    expect(screen.getByText("Add Today's Avoidance")).toBeInTheDocument();
    expect(screen.getByLabelText(/What did you consciously avoid today/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fear Category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Entry/i })).toBeInTheDocument();
  });

  test('textarea is initially empty', () => {
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    expect(textarea).toHaveValue('');
  });

  test('updates textarea value on user input', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    await user.type(textarea, 'Test avoidance');

    expect(textarea).toHaveValue('Test avoidance');
  });

  test('category defaults to rejection', () => {
    render(<AddEntry onAdd={mockOnAdd} />);

    const select = screen.getByLabelText(/Fear Category/i);
    expect(select).toHaveValue('rejection');
  });

  test('changes category when user selects different option', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const select = screen.getByLabelText(/Fear Category/i);
    await user.selectOptions(select, 'uncertainty');

    expect(select).toHaveValue('uncertainty');
  });

  test('submit button is disabled when textarea is empty', () => {
    render(<AddEntry onAdd={mockOnAdd} />);

    const button = screen.getByRole('button', { name: /Add Entry/i });
    expect(button).toBeDisabled();
  });

  test('submit button is enabled when textarea has text', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    await user.type(textarea, 'Some avoidance');

    const button = screen.getByRole('button', { name: /Add Entry/i });
    expect(button).not.toBeDisabled();
  });

  test('calls addEntry with correct data on form submission', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    const select = screen.getByLabelText(/Fear Category/i);
    const button = screen.getByRole('button', { name: /Add Entry/i });

    await user.type(textarea, 'Test avoidance');
    await user.selectOptions(select, 'effort');
    await user.click(button);

    expect(utils.addEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Test avoidance',
        category: 'effort',
        date: expect.any(String),
      })
    );
  });

  test('clears textarea after successful submission', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    const button = screen.getByRole('button', { name: /Add Entry/i });

    await user.type(textarea, 'Test avoidance');
    await user.click(button);

    expect(textarea).toHaveValue('');
  });

  test('calls onAdd callback after submission', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    const button = screen.getByRole('button', { name: /Add Entry/i });

    await user.type(textarea, 'Test avoidance');
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalled();
  });

  test('does not call addEntry for whitespace-only entries', async () => {
    const user = userEvent.setup();
    render(<AddEntry onAdd={mockOnAdd} />);

    const textarea = screen.getByLabelText(/What did you consciously avoid today/i);
    const button = screen.getByRole('button', { name: /Add Entry/i });

    // Whitespace-only text should keep the button disabled
    await user.type(textarea, '   ');
    
    // Button should still be disabled because trim() returns empty string
    expect(button).toBeDisabled();
    await user.click(button);

    // addEntry should not be called
    expect(utils.addEntry).not.toHaveBeenCalled();
  });
});
