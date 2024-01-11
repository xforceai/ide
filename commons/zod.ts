import { VARIABLE_NAME_REGEX } from '@/commons/regex';
import { z } from 'zod';

const VariableName = z
  .string({
    required_error:
      'Variable name must start with a letter or underscore, and can only contain letters, numbers, and underscores.',
  })
  .regex(VARIABLE_NAME_REGEX, {
    message:
      'Variable name must start with a letter or underscore, and can only contain letters, numbers, and underscores.',
  });

const UserProxy = z.object({
  variableName: VariableName,
  initialPrompt: z
    .string({
      required_error: 'Initial Prompt is required. Your workforce will take this prompt to start the conversation.',
    })
    .min(1, { message: 'Initial Prompt is required. Your workforce will take this prompt to start the conversation.' }),
});
const AgentSelectionEnum = z.enum(['auto', 'manual', 'random', 'round robin']);
const GroupChat = z.object({
  variableName: VariableName,
  maxRounds: z.number().optional(),
  agentSelection: AgentSelectionEnum.default('auto'), // TODO: add enum
});

const GPTAssistantAgent = z.object({
  variableName: VariableName,
  OAIId: z
    .string({ required_error: 'The OpenAI Id of the assistant agent is required.' })
    .min(1, { message: 'The OpenAI Id of the assistant agent is required.' }),
});

const CustomFunction = z.object({
  func: z.string().optional(),
});

const LLMOpenAI = z.object({
  variableName: VariableName,
  apiKey: z.string().optional(),
});

export const DnDFlowValidationSchema = z.array(
  z.object({
    USER_PROXY: z.optional(UserProxy),
    GROUP_CHAT: z.optional(GroupChat),
    GPT_ASSISTANT_AGENT: z.optional(GPTAssistantAgent),
    CUSTOM_FUNCTION: z.optional(CustomFunction),
    LLM_OPENAI: z.optional(LLMOpenAI),
  }),
);

export type DnDFlowValidationSchemaType = z.infer<typeof DnDFlowValidationSchema>;
