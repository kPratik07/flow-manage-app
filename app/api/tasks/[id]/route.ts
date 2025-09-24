import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { updateTaskSchema } from '@/utils/validation'

// ✅ Define request body type for updates
type UpdateTaskBody = {
  title: string
  description?: string
  priority?: string
  status?: string
  dueDate?: string
}

// ✅ GET Task by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔹 match Next.js typing
) {
  try {
    const { id } = await context.params // 🔹 await since it's a Promise

    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const task = await prisma.task.findFirst({
      where: { id, userId: payload.userId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Get task error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ✅ UPDATE Task
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // 🔹 match Next.js typing
) {
  try {
    const { id } = await context.params
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as UpdateTaskBody
    await updateTaskSchema.parseAsync(body)

    const task = await prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Update task error:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

// ✅ DELETE Task
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // 🔹 match Next.js typing
) {
  try {
    const { id } = await context.params
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const task = await prisma.task.findFirst({
      where: { id, user: { email: session.user.email } },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    await prisma.task.delete({ where: { id } })

    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
