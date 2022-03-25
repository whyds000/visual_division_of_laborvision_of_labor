interface LineCoordinate {
  x: number
  y: number
}
interface lineCoordinateItem {
  id: number
  name: string
  coordinate: LineCoordinate[]
}
interface CircleCoordinate {
  x: number
  y: number
  raradius: number
  startAngle: number
  endAngle: number
  counterclockwise?: boolean | undefined
}
const lineCoordinate: lineCoordinateItem[] = [
  {
    id: 1,
    name: '1号线',
    coordinate: [
      {
        x: 300,
        y: 500
      },
      {
        x: 800,
        y: 500
      },
      {
        x: 1000,
        y: 600
      },
      {
        x: 1000,
        y: 700
      },
      {
        x: 1300,
        y: 400
      },
      {
        x: 1500,
        y: 400
      },
      {
        x: 1600,
        y: 400
      },
      {
        x: 1700,
        y: 500
      },
      {
        x: 1920,
        y: 500
      }
    ]
  },
  {
    id: 2,
    name: '2号线',
    coordinate: [
      {
        x: 300,
        y: 300
      },
      {
        x: 600,
        y: 300
      },
      {
        x: 800,
        y: 400
      },
      {
        x: 800,
        y: 400
      },
      {
        x: 1100,
        y: 200
      },
      {
        x: 1300,
        y: 200
      },
      {
        x: 1400,
        y: 200
      },
      {
        x: 1500,
        y: 300
      },
      {
        x: 1920,
        y: 300
      }
    ]
  },
  {
    id: 3,
    name: '3号线',
    coordinate: [
      {
        x: 300,
        y: 600
      },
      {
        x: 600,
        y: 600
      },
      {
        x: 800,
        y: 800
      },
      {
        x: 800,
        y: 1000
      },
      {
        x: 1100,
        y: 800
      },
      {
        x: 1300,
        y: 900
      },
      {
        x: 1400,
        y: 500
      },
      {
        x: 1500,
        y: 600
      },
      {
        x: 1920,
        y: 600
      }
    ]
  },
  {
    id: 4,
    name: '4号线',
    coordinate: [
      {
        x: 300,
        y: 400
      },
      {
        x: 600,
        y: 350
      },
      {
        x: 800,
        y: 760
      },
      {
        x: 1200,
        y: 700
      },
      {
        x: 1300,
        y: 800
      },
      {
        x: 1300,
        y: 600
      },
      {
        x: 1700,
        y: 800
      },
      {
        x: 1500,
        y: 900
      },
      {
        x: 1920,
        y: 900
      }
    ]
  }
]
const circleCoordinate: CircleCoordinate[] = [
  {
    x: 800,
    y: 500,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1300,
    y: 400,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1800,
    y: 500,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 900,
    y: 330,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1200,
    y: 200,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1500,
    y: 300,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 600,
    y: 600,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 800,
    y: 800,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1500,
    y: 600,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 500,
    y: 370,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1000,
    y: 730,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  },
  {
    x: 1560,
    y: 730,
    raradius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    counterclockwise: true
  }
]
export { lineCoordinate, circleCoordinate, lineCoordinateItem }
