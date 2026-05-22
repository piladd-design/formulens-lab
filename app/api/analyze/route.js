export async function POST(req) {
  try {
    const body = await req.json()

    return Response.json({
      success: true,
      message: 'FORMULENS API WORKING',
      received: body
    })

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    })
  }
}
