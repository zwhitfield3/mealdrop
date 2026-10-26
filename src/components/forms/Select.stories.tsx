import type { Meta, StoryObj } from '@storybook/react-vite'

import { expect, fn } from 'storybook/test'

import { Select } from './Select'

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1145-3229&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: ['Burger', 'Pizza', 'Sushi'],
    id: 'select',
    'aria-label': 'food',
  },
}

export const WithLabel: Story = {
  args: {
    ...Default.args,
    id: 'select',
    label: 'Select field',
  },
}

export const ChangingQuantity: Story = {
  args: {
    options: [1, 2, 3, 4, 5],
    id: 'quantity',
    label: 'Quantity',
    'aria-label': 'quantity',
    onChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const select = canvas.getByRole('combobox', { name: 'quantity' })
    await userEvent.selectOptions(select, '3')
    await expect(args.onChange).toHaveBeenCalledWith(3)
  },
}
