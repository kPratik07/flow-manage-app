import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Priority color mapping
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'LOW':
      return 'text-green-600 bg-green-50'
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-50'
    case 'HIGH':
      return 'text-orange-600 bg-orange-50'
    case 'URGENT':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

// Status color mapping
export function getStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'text-blue-600 bg-blue-50'
    case 'IN_PROGRESS':
      return 'text-purple-600 bg-purple-50'
    case 'COMPLETED':
      return 'text-green-600 bg-green-50'
    case 'CANCELLED':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

// Error handling utility
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

// Local storage utilities
export function getFromLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}

export function setToLocalStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, value)
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}
