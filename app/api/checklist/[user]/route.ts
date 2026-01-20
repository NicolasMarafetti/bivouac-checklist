import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ user: string }> }
) {
  try {
    const { user: userName } = await params

    let user = await prisma.user.findUnique({
      where: { name: userName },
      include: { items: true }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { name: userName },
        include: { items: true }
      })
    }

    const checkedItems: { [key: string]: boolean } = {}
    user.items.forEach(item => {
      checkedItems[item.itemName] = item.checked
    })

    return NextResponse.json({ checkedItems })
  } catch (error) {
    console.error('Error fetching checklist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch checklist' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ user: string }> }
) {
  try {
    const { user: userName } = await params
    const { itemName, checked } = await request.json()

    let user = await prisma.user.findUnique({
      where: { name: userName }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { name: userName }
      })
    }

    await prisma.checklistItem.upsert({
      where: {
        userId_itemName: {
          userId: user.id,
          itemName: itemName
        }
      },
      update: { checked },
      create: {
        userId: user.id,
        itemName,
        checked
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating checklist:', error)
    return NextResponse.json(
      { error: 'Failed to update checklist' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ user: string }> }
) {
  try {
    const { user: userName } = await params

    const user = await prisma.user.findUnique({
      where: { name: userName }
    })

    if (user) {
      await prisma.checklistItem.deleteMany({
        where: { userId: user.id }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting checklist:', error)
    return NextResponse.json(
      { error: 'Failed to reset checklist' },
      { status: 500 }
    )
  }
}
