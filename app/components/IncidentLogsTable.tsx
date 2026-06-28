import React, { FC } from 'react'
import { CheckResult } from '../types/monitor'
import { table } from 'console'

interface IncidentLogsTableProps {
  history: CheckResult[];
}

export const IncidentLogsTable: FC<IncidentLogsTableProps> = ({ history = [] }) => {
    
  const reversedHistory = [...history].reverse()

  return (
    <table className="w-full">
      <thead className="text-left">
        <tr>
          <th className="p-4 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Time
          </th>
          <th className="p-4 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Status
          </th>
          <th className="p-4 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Latency
          </th>
          <th className="p-4 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Status code
          </th>
        </tr>
      </thead>
      <tbody>
        {reversedHistory.map((check, index) => (
          <tr key={check.id} className="border-b last:border-b-0 border-slate-200 dark:border-slate-800">
            <td className="p-4 whitespace-nowrap">
              {new Date(check.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="p-4 whitespace-nowrap">
              {check.status}
            </td>
            <td className="p-4 whitespace-nowrap">
              {check.latency}
            </td>
            <td className="p-4 whitespace-nowrap">
              {check.statusCode}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
