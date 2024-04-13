import { GetForms, GetFormStats } from "@/actions/form";
import CreateFormButton from "@/components/CreateFormButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Suspense } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-4 ">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>

      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense fallback={[1, 2, 3].map(el => <FormCardSkeleton key={el} />)}>
          <FormCards />
        </Suspense>
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


function FormCardSkeleton() {
  return (
    <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />
  )
}

async function FormCards() {
  const forms = await GetForms()
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold ">
            {form.name}
          </span>
          {form.published && <Badge className=" bg-blue-700 text-white ">Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {/* NOTE - date modification */}
          {
            formatDistance(form.createdAt, new Date(), {
              addSuffix: true
            })
          }
          {
            !form.published && (
              <span className="flex items-center gap-2">
                <LuView className=" text-muted-foreground " />
                <span>{form.visits.toLocaleString()}</span>
                <FaWpforms className=" text-muted-foreground " />
                <span>{form.submissions.toLocaleString()}</span>
              </span>
            )
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-muted-foreground text-sm ">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {
          form.published && (
            <Button asChild className="w-full group mt-2 text-md gap-4">
              <Link href={`/forms/${form.id}`}>
                View submissions <BiRightArrowAlt className=" group-hover:translate-x-2 group-hover:duration-500  " />
              </Link>
            </Button>
          )
        }
        {
          !form.published && (
            <Button asChild className="w-full group mt-2 text-md gap-4">
              <Link href={`/builder/${form.id}`}>
                Edit form <FaEdit className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:duration-500  " />
              </Link>
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}