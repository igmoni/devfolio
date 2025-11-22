'use client'
import React from 'react'
import { githubConfig } from '@/config/Github'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'
import Container from '../common/Container'
import Github from '@/svgs/Github'
import { Button } from '../ui/button'

const ActivityCalendar = dynamic(() => import('react-activity-aclendar').then(mod => mod.default), { ssr: false })

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
  const [isLoading, setLoading] = useState(true)
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
    <Container className={'mt-20'}>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-foreground'>
              {githubConfig.title}
            </h2>
            <p className='text-sm text-muted-foreground'>
              <b>{githubConfig.username}</b>&apo;s {githubConfig.subtitle}
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
          <div className='flex items-center justify-center py-=16'>
            <div className='text-center'>
              <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-sm text-muted-foreground'>{githubConfig.loadingState.desc}</p>
            </div>
          </div>
        ): hasError || contributions.length === 0 ? (
        <div className='p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl'>
          <div className='w-16 h-16 mx-auto mb-04 rounded-full bg-muted flex items-center justify-center'>
            <Github className='w-8 h-8'/>
          </div>
          {/* Pending */}

        </div>
      ): (<div></div>)}
      </div>
    </Container>
  )
}

export default Github
