import { Types } from "mongoose";
import { Note } from "../models/note.model.js";

type TopTag = {
  tag: string;
  count: number;
};

type UserInsights = {
  totalNotes: number;
  recentlyEdited: number;
  topTags: TopTag[];
};

export const getUserInsights = async (userId: string): Promise<UserInsights> => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const userObjectId = new Types.ObjectId(userId);

  const [totalNotes, recentlyEdited, topTags] = await Promise.all([
    Note.countDocuments({ userId, isArchived: false }),
    Note.countDocuments({
      userId,
      isArchived: false,
      lastEditedAt: { $gte: sevenDaysAgo }
    }),
    Note.aggregate<TopTag>([
      {
        $match: {
          userId: userObjectId,
          isArchived: false
        }
      },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1, _id: 1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1
        }
      }
    ])
  ]);

  return {
    totalNotes,
    recentlyEdited,
    topTags
  };
};
