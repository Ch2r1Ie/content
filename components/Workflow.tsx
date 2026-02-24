'use client'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  ArrowRightIcon,
  BarChart2Icon,
  ChevronDownIcon,
  ClockIcon,
  FileTextIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import * as React from 'react'

const contentItems = [
  'How AI is reshaping social media',
  '10 TikTok trends for 2026',
  'Short-form video best practices',
  'Writing hooks that stop the scroll',
  'Repurposing long-form into clips',
  'Captions that drive engagement',
  'Optimal post timing by platform',
  'Using AI to A/B test copy',
  'Building a content calendar',
  'Viral audio strategy guide',
]

const aiModels = [
  { name: 'GPT-4o', provider: 'OpenAI' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { name: 'Gemini 1.5 Pro', provider: 'Google' },
  { name: 'Llama 3.1', provider: 'Meta' },
  { name: 'Mistral Large', provider: 'Mistral' },
]

const analyticsMock = [
  { label: 'Views', value: '124.3K', trend: '+18%' },
  { label: 'Likes', value: '9.8K', trend: '+24%' },
  { label: 'Shares', value: '3.2K', trend: '+11%' },
  { label: 'Comments', value: '1.4K', trend: '+9%' },
  { label: 'Followers', value: '+2.1K', trend: '+6%' },
]

const presetTimes = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, '0')}:00`,
)

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.23 8.23 0 004.84 1.57V7.05a4.85 4.85 0 01-1.07-.36z' />
    </svg>
  )
}

export function Workflow() {
  const [selectedAI, setSelectedAI] = React.useState(aiModels[0])
  const [prompt, setPrompt] = React.useState('')
  const [postTime, setPostTime] = React.useState('09:00')
  const [selectedContent, setSelectedContent] = React.useState<string[]>([])

  const toggleContent = (item: string) => {
    setSelectedContent((prev) => (prev.includes(item) ? [] : [item]))
  }

  return (
    <div className='flex w-full max-w-7xl flex-col items-stretch gap-4 px-4 font-mono md:flex-row md:items-start md:px-8'>
      {/* Step 1: Content */}
      <div className='flex min-w-0 flex-1 flex-col gap-2 '>
        <ButtonGroup className='w-full'>
          <Button
            variant='outline'
            size='lg'
            className='w-full gap-2 text-base'
          >
            <FileTextIcon className='h-5 w-5 shrink-0' />
            Content
          </Button>
        </ButtonGroup>

        <div className='w-full overflow-hidden rounded-md border'>
          {/* Selected section */}
          {selectedContent.length > 0 && (
            <>
              <div className='p-2'>
                {selectedContent.map((item) => (
                  <div
                    key={item}
                    className='flex items-center justify-between rounded bg-muted px-2 py-2 text-sm font-medium'
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => toggleContent(item)}
                      className='ml-2 shrink-0 rounded p-0.5 hover:bg-background'
                    >
                      <XIcon className='h-3.5 w-3.5 text-muted-foreground' />
                    </button>
                  </div>
                ))}
              </div>
              <Separator />
            </>
          )}
          {/* Full list */}
          <ScrollArea className='h-56'>
            <div className='p-2'>
              {contentItems.map((item, i) => (
                <React.Fragment key={item}>
                  <div
                    className={`flex cursor-pointer items-center rounded px-2 py-2 text-sm transition hover:bg-muted ${
                      selectedContent.includes(item)
                        ? 'text-muted-foreground'
                        : ''
                    }`}
                    onClick={() => toggleContent(item)}
                  >
                    {item}
                  </div>
                  {i < contentItems.length - 1 && (
                    <Separator className='my-0.5' />
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Arrow */}
      <ArrowRightIcon className='mx-auto h-5 w-5 shrink-0 rotate-90 text-muted-foreground md:mx-0 md:mt-3 md:rotate-0' />

      {/* Step 2: AI */}
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='lg'
              className='w-full gap-2 text-base'
            >
              {selectedAI.name}
              <ChevronDownIcon className='ml-auto h-4 w-4 shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-56'>
            <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {aiModels.map((model) => (
                <DropdownMenuItem
                  key={model.name}
                  onSelect={() => setSelectedAI(model)}
                >
                  {model.name}
                  <span className='ml-auto text-xs text-muted-foreground'>
                    {model.provider}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Write your prompt…'
          rows={5}
          className='w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring'
        />

        <Button
          size='sm'
          className='w-full gap-2 text-sm'
          disabled={!prompt.trim()}
        >
          Submit
        </Button>
      </div>

      {/* Arrow */}
      <ArrowRightIcon className='mx-auto h-5 w-5 shrink-0 rotate-90 text-muted-foreground md:mx-0 md:mt-3 md:rotate-0' />

      {/* Step 3: TikTok */}
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <ButtonGroup className='w-full'>
          <Button
            variant='outline'
            size='lg'
            className='w-full gap-2 text-base'
          >
            <TikTokIcon className='h-5 w-5 shrink-0' />
            TikTok
          </Button>
        </ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='lg'
              className='w-full gap-2 text-base'
            >
              <ClockIcon className='h-4 w-4 shrink-0 text-xs' />
              Schedule
              <span className='ml-auto font-mono'>{postTime}</span>
              <ChevronDownIcon className='h-4 w-4 shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='max-h-60 w-36 overflow-y-auto'
          >
            <DropdownMenuLabel>Posting time</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={postTime}
              onValueChange={setPostTime}
            >
              {presetTimes.map((t) => (
                <DropdownMenuRadioItem key={t} value={t}>
                  {t}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Arrow */}
      <ArrowRightIcon className='mx-auto h-5 w-5 shrink-0 rotate-90 text-muted-foreground md:mx-0 md:mt-3 md:rotate-0' />

      {/* Step 4: Analyse */}
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <ButtonGroup className='w-full'>
          <Button
            variant='outline'
            size='lg'
            className='w-full gap-2 text-base'
          >
            <BarChart2Icon className='h-5 w-5 shrink-0' />
            Analyse
          </Button>
        </ButtonGroup>
        <div className='w-full rounded-md border p-3'>
          <div className='mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            <TrendingUpIcon className='h-3.5 w-3.5' />
            Last 7 days
          </div>
          <div className='space-y-1.5'>
            {analyticsMock.map(({ label, value, trend }) => (
              <div
                key={label}
                className='flex items-center justify-between text-sm'
              >
                <span className='text-muted-foreground'>{label}</span>
                <span className='font-medium'>{value}</span>
                <span className='text-xs text-green-500'>{trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
