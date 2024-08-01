"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

interface GeneralStatsType {
  totalDailySummariesRequests: number;
  totalLimelightRequests: number;
  totalRequests: number;
}

const Dashboard = () => {

  const { user } = useAuth()

  const [generalStats, setGeneralStats] = useState<GeneralStatsType | null>(null);

  const getGeneralStats = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats/general`)      
      setGeneralStats(res.data.finalStats);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGeneralStats()
  }, [])

  return (
    <main>
      <div className='flex gap-2'>
        <Card className='w-1/3 text-neutral-700'>
          <CardHeader>
            <CardTitle>Limelight requests</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.limelightRequests as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
        <Card className='w-1/3 text-neutral-700'>
          <CardHeader>
            <CardTitle>Daily Summaries requests</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.dailySummariesRequests as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
        <Card className='w-1/3 text-neutral-700'>
          <CardHeader>
            <CardTitle>Total API usage</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.dailySummariesRequests as number + user?.limelightRequests! as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent>
            <h3>Total Limelight Requests served: {generalStats?.totalDailySummariesRequests}</h3>
            <h3>Total Limelight Requests served: {generalStats?.totalLimelightRequests}</h3>
            <h3>Total API Requests served: {generalStats?.totalRequests}</h3>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Dashboard