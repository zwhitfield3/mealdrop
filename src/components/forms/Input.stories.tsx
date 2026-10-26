import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'Components/Form/Input',
  component: Input,
  args: {
    onChange: fn(),
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1126-3572&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'input',
  },
}

export const WithLabel: Story = {
  args: {
    id: 'input',
    label: 'Input field',
  },
}

export const WithHint: Story = {
  args: {
    ...WithLabel.args,
    placeholder: 'This is a hint',
  },
}

export const Filled: Story = {
  args: {
    ...WithLabel.args,
    value: 'Already filled text',
  },
}

export const ErrorValidation: Story = {
  args: {
    id: 'input',
    label: 'Input field',
    value: 'jane@doecom',
    error: 'email should be valid',
  },
}

export const TypingUpdatesValue: Story = {
  args: {
    ...WithLabel.args,
    placeholder: 'Enter your email',
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText('Input field')
    await userEvent.type(input, 'jane@doe.com')
    await expect(input).toHaveValue('jane@doe.com')
    await expect(args.onChange).toHaveBeenCalledTimes('jane@doe.com'.length)
  },
}
