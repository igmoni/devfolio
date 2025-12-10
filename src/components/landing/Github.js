'use client'
import React from 'react'
import { githubConfig } from '@/config/Github'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'
import Container from '../common/Container'
import GithubIcon from '@/svgs/Github'
import { Button } from '../ui/button'

const ActivityCalendar = dynamic(
  () =>
    import("react-activity-calendar").then(
      (mod) => mod.ActivityCalendar
    ),
  { ssr: false }
);


const filterLastYear = (contributions) => {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  return contributions.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate >= oneYearAgo
  })
}

const Github = () => {
  const [contributions, setContributions] = useState([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const res = await fetch(`${githubConfig.apiUrl}/${githubConfig.username}.json`)

        const data = await res.json()

        if (data?.contributions && Array.isArray(data.contributions)) {
          const flattenedContributions = data.contributions.flat()

          const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4
          }

          const validContributions = flattenedContributions
            .filter((item) => {
              return (
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'contributionCount' in item &&
                'contributionLevel' in item
              );
            })
            .map((item) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: contributionLevelMap[item.contributionLevel] || 0,
            }));

          if (validContributions.length > 0) {
            const total = validContributions.reduce((sum, item) => sum + item.count, 0)

            setTotalContributions(total)

            const filteredContributions = filterLastYear(validContributions)
            setContributions(filteredContributions)
          } else {
            setHasError(true)
          }

        } else {
          setHasError(true)
        }
      } catch (err) {
        console.error('Failed to fetch Github contributions:', err)

      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Container className={'mt-20 px-5'}>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-foreground'>
              {githubConfig.title}
            </h2>
            <p className='text-sm text-muted-foreground'>
              <b>{githubConfig.username}</b>'s {githubConfig.subtitle}
            </p>

            {isLoading && !hasError && totalContributions > 0 && (
              <p className='text-sm text-primary font-medium mt-1'>
                Total: {' '}
                <span className='font-black'>
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center py-16'>
            <div className='text-center'>
              <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-sm text-muted-foreground'>{githubConfig.loadingState.desc}</p>
            </div>
          </div>
        ) : hasError || contributions.length === 0 ? (
          <div className='p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl'>
            <div className='w-16 h-16 mx-auto mb-04 rounded-full bg-muted flex items-center justify-center'>
              <GithubIcon className='w-8 h-8' />
            </div>
            <p className='font-medium mb-2'>{githubConfig.errorState.title}</p>
            <p className='text-sm mb-4'>
              {githubConfig.errorState.desc}
            </p>
            <Button variant='outline' asChild>
              <Link href={`https://github.com/${githubConfig.username}`} className='inline-flex items-center gap-2'>
                <GithubIcon className='w-4 h-4' />
                {githubConfig.errorState.buttontext}
              </Link>
            </Button>
          </div>
        ) : (
          <div className='relative overflow-hidden'>
            <div className='relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6'>
              <div className='w-full overflow-x-auto '>
                <ActivityCalendar
                  data={contributions}
                  blockSize={14}
                  blockMargin={4}
                  fontSize={githubConfig.fontSize}
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  maxLevel={githubConfig.maxLevel}
                  hideTotalCount={true}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  theme={githubConfig.theme}
                  labels={{
                    months: githubConfig.months,
                    weekdays: githubConfig.weekDays,
                    totalCount: githubConfig.totalCountLabel,
                  }}
                  style={{
                    color: 'rgb(139,148,158)',
                    margin: '0 auto',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Github
