import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, isDate, type JsonOutput, type prisma } from '$lib/server';

type QueryParams = {
  start: string;
  end: string;
};

type EventOccurenceFull = prisma.EventOccurence & {
  files: prisma.MapEventOccurenceFile[];
  serie: prisma.EventSerie;
};

export const get = handleRequest<{
  SearchParams: Partial<QueryParams>;
  Output: { eventOccurences: EventOccurenceFull[] };
  CacheField: 'start' | 'end';
}>(
  null,
  async ({ searchParams: { end, start } }) => {
    const startDate = isDate(start) ? new Date(start) : undefined;
    const endDate = isDate(end) ? new Date(end) : undefined;

    return {
      body: {
        eventOccurences: await client.eventOccurence.findMany({
          select: {
            id: true,
            body: true,
            start: true,
            end: true,
            authorId: true,
            files: true,
            serieId: true,
            serie: true
          },
          where: { start: { gte: startDate }, end: { lte: endDate } }
        })
      }
    };
  },
  {
    outputType: 'eventOccurences',
    fields: ['start', 'end'],
    getCacheProps: (_, { searchParams: { end, start } }) => ({
      start: isDate(start) ? new Date(start).toJSON() : 'all',
      end: isDate(end) ? new Date(end).toJSON() : 'all'
    })
  }
);

export const post = handleRequest<{
  Body: {
    eventOccurence: Pick<
      JsonOutput<prisma.EventOccurence>,
      'body' | 'end' | 'start' | 'serieId'
    > & {
      weekDaySelected?: number;
      monthDaySelected?: number;
    };
  };
  Output: never | { count: number };
}>(
  'admin',
  async ({ request }, userAuth) => {
    if (!userAuth) {
      throw HttpCode.forbidden();
    }

    const {
      eventOccurence: { body, end, start, serieId, weekDaySelected, monthDaySelected }
    } = await request.json();

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!body || !isDate(startDate) || !isDate(endDate) || !serieId) {
      throw HttpCode.badRequest([]);
    }

    if (
      typeof weekDaySelected === 'number' &&
      isFinite(weekDaySelected) &&
      weekDaySelected >= 0 &&
      weekDaySelected < 7
    ) {
      const cursor = new Date(startDate);
      const dateList = [];

      if (cursor.getDay() !== weekDaySelected) {
        cursor.setDate(
          weekDaySelected > cursor.getDate()
            ? weekDaySelected - cursor.getDate()
            : 7 - weekDaySelected + cursor.getDate()
        );
      }

      while (cursor.valueOf() < endDate.valueOf()) {
        dateList.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 7);
      }

      const data = dateList.map(
        (date): prisma.Prisma.EventOccurenceCreateManyInput => ({
          body,
          serieId,
          authorId: userAuth.user.id,
          start: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds(),
            0
          ),
          end: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            endDate.getHours(),
            endDate.getMinutes(),
            endDate.getSeconds(),
            0
          )
        })
      );

      const { count } = await client.eventOccurence.createMany({ data });
      return { body: { count } };
    }

    if (
      typeof monthDaySelected === 'number' &&
      isFinite(monthDaySelected) &&
      monthDaySelected >= 1 &&
      monthDaySelected <= 31
    ) {
      const cursor = new Date(startDate);
      const dateList = [];

      if (cursor.getDay() !== monthDaySelected) {
        if (monthDaySelected < cursor.getDate()) {
          cursor.setMonth(cursor.getMonth() + 1);
        }
        cursor.setDate(monthDaySelected);
      }

      while (cursor.valueOf() < endDate.valueOf()) {
        while (cursor.getDay() !== monthDaySelected) {
          cursor.setDate(monthDaySelected);
        }
        dateList.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      }

      const data = dateList.map(
        (date): prisma.Prisma.EventOccurenceCreateManyInput => ({
          body,
          serieId,
          authorId: userAuth.user.id,
          start: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds(),
            0
          ),
          end: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            endDate.getHours(),
            endDate.getMinutes(),
            endDate.getSeconds(),
            0
          )
        })
      );

      const { count } = await client.eventOccurence.createMany({ data });
      return { body: { count } };
    }

    const { id } = await client.eventOccurence.create({
      data: { body, serieId, start: startDate, end: endDate, authorId: userAuth.user.id },
      select: { id: true }
    });
    throw HttpCode.redirect(`/api/events/occurences/${id}`);
  },
  { outputType: 'eventOccurences', shouldRemove: true }
);
