export default async function handler(req, res) {
    try {
      const data = await res.revalidate(`/composer/new2`);
      res.json({
        revalidated: true,
      });
    } catch (error) {
      console.log("errorr========>", error);
    }
  }