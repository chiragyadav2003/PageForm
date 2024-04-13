import { GetFormStats } from "@/actions/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>

      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
      </div>

    </div>
  )
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return (
    <>
      <StatsCards loading={false} data={stats} />
    </>
  )
}

interface StatsCardsProps {
  //NOTE - defining type of data in props, it is of type which is return type of our server action "GetStats" but it is a promisified action so we willl wrap it around Awaited
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-blue-800" />}
        helperText={"All time form visits"}
        value={String(data?.visits) || ""}
        loading={loading}
        className={"shadow-md shadow-blue-600"}
      />
      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-800" />}
        helperText={"All time form submissions"}
        value={String(data?.submissions) || ""}
        loading={loading}
        className={"shadow-md shadow-yellow-600"}
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-800" />}
        helperText={"Visits that result in form submission"}
        value={String(data?.submissionRate) + "%" || ""}
        loading={loading}
        className={"shadow-md shadow-green-600"}
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-800" />}
        helperText={"Visits that leaves without interacting"}
        value={String(data?.bounceRate) + "%" || ""}
        loading={loading}
        className={"shadow-md shadow-red-600"}
      />
    </div>
  )
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string
}

function StatsCard({ title, icon, helperText, value, loading, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {
            loading && (
              <Skeleton>
                <span className="opacity-0">Hello</span>
              </Skeleton>
            )
          }
          {
            !loading && value
          }
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  )
}