import { mutation, query } from "./_generated/server";

export const getCount = query({
  handler: async (ctx) => {
    const record = await ctx.db.query("pageViews").first();
    return record?.count ?? 0;
  },
});

export const increment = mutation({
  handler: async (ctx) => {
    const record = await ctx.db.query("pageViews").first();
    if (record) {
      await ctx.db.patch(record._id, { count: record.count + 1 });
    } else {
      await ctx.db.insert("pageViews", { count: 1 });
    }
  },
});