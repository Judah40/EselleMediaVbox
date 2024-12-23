// AlertFeed.tsx
import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

type AlertLevel = 'critical' | 'warning' | 'info';

interface AlertItem {
  id: string | number;
  message: string;
  level: AlertLevel;
  time: string;
  isRead?: boolean;
}

interface AlertFeedProps {
  alerts: AlertItem[];
  onAlertClick?: (alert: AlertItem) => void;
  className?: string;
}

const getAlertIcon = (level: AlertLevel) => {
  switch (level) {
    case 'critical':
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case 'info':
      return <Info className="w-4 h-4 text-blue-600" />;
  }
};

const getAlertStyles = (level: AlertLevel) => {
  const baseStyles = 'rounded-full p-1';
  switch (level) {
    case 'critical':
      return `${baseStyles} bg-red-100`;
    case 'warning':
      return `${baseStyles} bg-yellow-100`;
    case 'info':
      return `${baseStyles} bg-blue-100`;
  }
};

const AlertFeed: React.FC<AlertFeedProps> = ({
  alerts,
  onAlertClick,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">System Alerts</h2>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active alerts</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center space-x-3 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-200 
                ${onAlertClick ? 'cursor-pointer' : ''} 
                ${!alert.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
              onClick={() => onAlertClick?.(alert)}
              role={onAlertClick ? 'button' : 'listitem'}
              tabIndex={onAlertClick ? 0 : undefined}
            >
              <div className={getAlertStyles(alert.level)}>
                {getAlertIcon(alert.level)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {alert.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertFeed;