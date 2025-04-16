import React from 'react'
import CollapsibleTableRow from '../components/collapsableTable';

export default function FarmNotificatio() {
  return (
    <div className="">
      <table className="w-1/2 border-collapse border border-l-amber-500 rounded-2xl">
        <thead>
          <tr className="bg-gray-">
            <th className="border px-4 py-2 text-left">
              <span className='text-emerald-600'>Recent Recommendations</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <CollapsibleTableRow
            title="Farm Details"
            content={
              <div>
                <p>Location: California</p>
                <p>Crop Type: Almonds</p>
                <p>Size: 50 acres</p>
              </div>
            }
          />
          <CollapsibleTableRow
            title="Device Status"
            content={
              <div>
                <p>Device ID: D-12345</p>
                <p>Battery: 85%</p>
                <p>Last Update: 2 hours ago</p>
              </div>
            }
          />
        </tbody>
      </table>
    </div>
  );
}
