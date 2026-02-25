'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  RefreshCwIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'

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

const postAnalyticsMock: Record<
  string,
  { views: string; likes: string; shares: string; trend: string }
> = {
  'How AI is reshaping social media': {
    views: '48.2K',
    likes: '3.1K',
    shares: '890',
    trend: '+32%',
  },
  '10 TikTok trends for 2026': {
    views: '31.7K',
    likes: '2.4K',
    shares: '610',
    trend: '+21%',
  },
  'Short-form video best practices': {
    views: '19.5K',
    likes: '1.2K',
    shares: '340',
    trend: '+14%',
  },
  'Writing hooks that stop the scroll': {
    views: '27.8K',
    likes: '2.0K',
    shares: '520',
    trend: '+19%',
  },
  'Repurposing long-form into clips': {
    views: '14.3K',
    likes: '980',
    shares: '210',
    trend: '+8%',
  },
  'Captions that drive engagement': {
    views: '22.1K',
    likes: '1.7K',
    shares: '430',
    trend: '+17%',
  },
  'Optimal post timing by platform': {
    views: '16.9K',
    likes: '1.1K',
    shares: '290',
    trend: '+11%',
  },
  'Using AI to A/B test copy': {
    views: '11.4K',
    likes: '760',
    shares: '180',
    trend: '+6%',
  },
  'Building a content calendar': {
    views: '9.8K',
    likes: '640',
    shares: '150',
    trend: '+4%',
  },
  'Viral audio strategy guide': {
    views: '38.6K',
    likes: '2.9K',
    shares: '740',
    trend: '+28%',
  },
}

const presetTimes = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, '0')}:00`,
)

const mockTikTokUser = {
  name: 'Alex Creator',
  handle: '@alexcreator',
  avatar: 'https://github.com/maxleiter.png',
}

function ProviderIcon({
  provider,
  className,
}: {
  provider: string
  className?: string
}) {
  switch (provider) {
    case 'OpenAI':
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.73 19.95a4.5 4.5 0 0 1-6.13-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z' />
        </svg>
      )
    case 'Anthropic':
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-3.654 0H6.57L0 20h3.603l1.357-3.405h6.834l1.357 3.405h3.603L10.173 3.52zm-1.075 10.108 2.222-5.572 2.222 5.572H9.098z' />
        </svg>
      )
    case 'Google':
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
        </svg>
      )
    case 'Meta':
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.985 1.99 1.22 2.99 1.22 1.075 0 2.061-.355 2.773-.995.71-.636 1.058-1.408 1.175-2.308.048-.366.048-.733 0-1.093-.052-.39-.173-.768-.32-1.133a6.2 6.2 0 0 0-.46-.92c-.329-.525-.787-1.028-1.39-1.498l-.458-.356.083-.14c.307-.517.634-1.058.92-1.667.219-.463.392-.95.505-1.467.114-.523.142-1.048.076-1.57-.13-.988-.56-1.858-1.33-2.596-.77-.738-1.87-1.214-3.237-1.214-1.06 0-1.954.267-2.69.637-.738.372-1.336.887-1.866 1.452-.53.565-.93 1.12-1.26 1.686l-.144.245-.145-.249C9.154 5.487 8.116 4.03 6.915 4.03zm.08 2.137c.771 0 1.527.673 2.272 1.7.31.424.615.924.91 1.476l.24.45-.24.43c-.63 1.123-1.29 2.273-1.929 3.326-1.426 2.386-2.007 3.108-2.734 3.756-.729.647-1.4.87-2.044.87-.748 0-1.31-.243-1.726-.773a3.542 3.542 0 0 1-.48-.897 5.416 5.416 0 0 1-.213-1.589c0-2.195.606-4.558 1.675-6.168.819-1.247 1.81-1.581 2.269-1.581zm11.048.033c.922 0 1.634.329 2.144.826.51.497.778 1.132.87 1.833.045.349.03.698-.046 1.038-.077.34-.22.668-.413 1.006a14.27 14.27 0 0 1-.62 1.063l-.126.202-.547-.43c-.744-.582-1.327-1.042-2.088-1.349-.76-.307-1.654-.464-2.817-.464h-.167l-.714-1.174c.346-.572.7-1.086 1.09-1.525.577-.645 1.214-1.026 3.434-1.026z' />
        </svg>
      )
    case 'Mistral':
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zm6.666-6.667h4v4h-4zm6.667 0h4v4h-4zm-6.667 6.667h4v4h-4zm6.667 0h4v4h-4zm-20 6.666h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm6.667 0h4v4h-4zM0 20h4v4H0zm13.333 0h4v4h-4zm6.667 0h4v4h-4z' />
        </svg>
      )
    default:
      return null
  }
}

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
  const [selectedAI, setSelectedAI] = useState(aiModels[0])
  const [prompt, setPrompt] = useState('')
  const [postTime, setPostTime] = useState('09:00')
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [items, setItems] = useState(contentItems)
  const [tiktokConnected, setTiktokConnected] = useState(false)

  const toggleContent = (item: string) => {
    setSelectedContent((prev) => prev.filter((i) => i !== item))
  }

  const addContent = (item: string) => {
    setSelectedContent((prev) => (prev.includes(item) ? prev : [...prev, item]))
  }

  const refreshContent = () => {
    // setSelectedContent([])
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5))
  }

  return (
    <div className='flex w-full flex-col items-stretch gap-4 px-4 font-mono md:flex-row md:items-start md:px-8'>
      {/* Step 1: Content */}
      <div className='flex min-w-0 flex-1 flex-col gap-2 '>
        <ButtonGroup className='w-full'>
          <Button variant='outline' size='lg' className='w-5/6 gap-2 text-base'>
            <FileTextIcon className='h-5 w-5 shrink-0' />
            Content
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='w-1/6 gap-2 hover:cursor-pointer'
            onClick={refreshContent}
          >
            <RefreshCwIcon className='h-4 w-4' />
          </Button>
        </ButtonGroup>

        <div className='w-full overflow-hidden rounded-md border'>
          {/* Selected section */}
          <div className='flex items-center gap-1.5 border-b px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            <FileTextIcon className='h-3.5 w-3.5' />
            Selected
          </div>
          {selectedContent.length > 0 && <Separator />}
          <ScrollArea className='h-56'>
            <div className='p-2'>
              {selectedContent.map((item) => (
                <div
                  key={item}
                  className='flex items-center justify-between rounded bg-muted px-2 py-2 text-sm font-medium mb-1'
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
          </ScrollArea>
        </div>

        <div className='w-full overflow-hidden rounded-md border'>
          <div className='flex items-center gap-1.5 border-b px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            <FileTextIcon className='h-3.5 w-3.5' />
            Social Media
          </div>
          <ScrollArea className='h-56'>
            <div className='divide-y'>
              {contentItems.map((post) => {
                const stats = postAnalyticsMock[post]
                const isSelected = selectedContent.includes(post)
                return (
                  <div
                    key={post}
                    className={`cursor-pointer px-3 py-2 transition hover:bg-muted ${isSelected ? 'opacity-40' : ''}`}
                    onClick={() => addContent(post)}
                  >
                    <p className='mb-1.5 truncate text-xs font-medium'>
                      {post}
                    </p>
                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                      <span>{stats.views} views</span>
                      <span>{stats.likes} likes</span>
                      <span>{stats.shares} shares</span>
                      <span className='ml-auto text-green-500'>
                        {stats.trend}
                      </span>
                    </div>
                  </div>
                )
              })}
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
              disabled={false}
            >
              <ProviderIcon
                provider={selectedAI.provider}
                className='h-4 w-4 shrink-0'
              />
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
          disabled={true}
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
            onClick={() => !tiktokConnected && setTiktokConnected(true)}
          >
            <TikTokIcon className='h-5 w-5 shrink-0' />
            {tiktokConnected ? 'TikTok' : 'Connect TikTok'}
          </Button>
        </ButtonGroup>
        {tiktokConnected && (
          <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
            <Avatar>
              <AvatarImage
                src='https://github.com/evilrabbit.png'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium'>
                {mockTikTokUser.name}
              </p>
              <p className='truncate text-xs text-muted-foreground'>
                {mockTikTokUser.handle}
              </p>
            </div>
            <button
              onClick={() => setTiktokConnected(false)}
              className='shrink-0 rounded p-1 hover:bg-muted'
            >
              <XIcon className='h-3.5 w-3.5 text-muted-foreground' />
            </button>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='lg'
              className='w-full gap-2 text-sm'
              disabled={!tiktokConnected}
            >
              <ClockIcon className='h-4 w-4 shrink-0 text-xs' />
              Schedule
              <span className='ml-auto font-mono'>{postTime}</span>
              <ChevronDownIcon className='h-4 w-4 shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='max-h-60 w-(--radix-dropdown-menu-trigger-width) overflow-y-auto'
          >
            <DropdownMenuRadioGroup
              value={postTime}
              onValueChange={setPostTime}
            >
              {presetTimes.map((t) => (
                <DropdownMenuRadioItem
                  key={t}
                  value={t}
                  className='justify-center text-center font-mono'
                >
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

        <div className='w-full overflow-hidden rounded-md border'>
          <div className='flex items-center gap-1.5 border-b px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            <FileTextIcon className='h-3.5 w-3.5' />
            Per post
          </div>
          <ScrollArea className='h-72'>
            <div className='divide-y'>
              {contentItems.map((post) => {
                const stats = postAnalyticsMock[post]
                return (
                  <div key={post} className='px-3 py-2'>
                    <p className='mb-1.5 truncate text-xs font-medium'>
                      {post}
                    </p>
                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                      <span>{stats.views} views</span>
                      <span>{stats.likes} likes</span>
                      <span>{stats.shares} shares</span>
                      <span className='ml-auto text-green-500'>
                        {stats.trend}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
