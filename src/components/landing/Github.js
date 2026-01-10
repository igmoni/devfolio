'use client'

import React, { useEffect, useState } from 'react'
import { githubConfig } from '@/config/Github'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Link } from 'next-view-transitions'
import Container from '../common/Container'
import GithubIcon from '@/svgs/Github'
import { Button } from '../ui/button'
import WakaTimeText from './WakaTimeText'
import { instrumentSerif } from './Hero'
import ArrowUpRight from '@/svgs/ArrowUpRight'

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then(mod => mod.ActivityCalendar),
  { ssr: false }
)

/* ---------- helpers ---------- */

const filterLastYear = (contributions) => {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  return contributions.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate >= oneYearAgo
  })
}

/* ---------- component ---------- */

const Github = () => {
  const { theme } = useTheme()

  const [contributions, setContributions] = useState([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  /* track screen width */
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth)
    updateWidth()

    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  /* responsive block size */
  const getBlockSize = () => {
    if (screenWidth < 480) return 8     // small phones
    if (screenWidth < 768) return 10    // large phones
    return 13                           // tablet & desktop
  }

  /* fetch github data */
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setHasError(false)

        const res = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}.json`
        )
        const data = await res.json()

        if (!Array.isArray(data?.contributions)) {
          setHasError(true)
          return
        }

        const flattened = data.contributions.flat()

        const levelMap = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        }

        const valid = flattened
          .filter(
            item =>
              item &&
              typeof item === 'object' &&
              'date' in item &&
              'contributionCount' in item &&
              'contributionLevel' in item
          )
          .map(item => ({
            date: String(item.date),
            count: Number(item.contributionCount || 0),
            level: levelMap[item.contributionLevel] ?? 0,
          }))

        if (!valid.length) {
          setHasError(true)
          return
        }

        setTotalContributions(
          valid.reduce((sum, item) => sum + item.count, 0)
        )

        setContributions(filterLastYear(valid))
      } catch (err) {
        console.error('Failed to fetch Github contributions:', err)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Container className="mt-20 px-5">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold flex justify-between items-center text-foreground">
            <p>
              <span className={`${instrumentSerif.className} italic text-3xl`}>Github</span> Activity
            </p>
            {/* <Link href={githubConfig.githubLink} target='_blank' className='text-lg font-medium hover:underline transition-all duration-500 '>View Profile</Link> */}
            <Link
              href={githubConfig.githubLink}
              target="_blank"
              className="
    group
    relative
    inline-flex
    items-center
    gap-1
    text-lg
    font-medium
  "
            >
              <span className="relative ">
                View Profile
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-current scale-x-0 origin-right transition-all duration-200 ease-out group-hover:scale-x-100 group-hover:origin-left"
                />
              </span>
              <ArrowUpRight className="size-4 transform group-hover:scale-150 transition-all duration-300 ease-out group-hover:translate-x-1 " />

            </Link>
          </h2>
          <p className="text-sm text-muted-foreground">
            <b>{githubConfig.username}</b>'s {githubConfig.subtitle}
          </p>

          {!isLoading && !hasError && totalContributions > 0 && (
            <div className='flex md:flex-row flex-col gap-5  md:items-center justify-between'>

              <p className="text-sm text-primary dark:text-white font-medium mt-1">
                Total:{' '}
                <span className="font-black">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions

              </p>
              <WakaTimeText />
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                {githubConfig.loadingState.desc}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && (hasError || contributions.length === 0) && (
          <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <GithubIcon className="w-8 h-8" />
            </div>
            <p className="font-medium mb-2">
              {githubConfig.errorState.title}
            </p>
            <p className="text-sm mb-4">
              {githubConfig.errorState.desc}
            </p>
            <Button variant="outline" asChild>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                {githubConfig.errorState.buttontext}
              </Link>
            </Button>
          </div>
        )}

        {/* Calendar */}
        {!isLoading && !hasError && contributions.length > 0 && (
          <div className="relative overflow-hidden">
            <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6">
              <div className="w-full overflow-x-auto">
                <ActivityCalendar
                  data={contributions}
                  blockSize={getBlockSize()}
                  blockMargin={3}
                  fontSize={githubConfig.fontSize}
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  maxLevel={githubConfig.maxLevel}
                  hideTotalCount
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
