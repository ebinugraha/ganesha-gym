import { Button } from "@/components/ui/button"
import { Crown, Download, Plus } from "lucide-react"

export const MembershipHeaders = () => {
    return (
        <div className="flex items-center justify-between">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold text-white">
          Manajemen Membership {`(${5})`}
        </h1>
        <p className="text-sm text-muted-foreground">
          Kelola membership dan monitor penggunaan secara real-time
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button size={"sm"} variant={"glass"}>
          <Download className="mr-2" />
          Export
        </Button>
        <Button
          size={"sm"}
          className="font-normal transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          <Crown />
          Tambah Membership
        </Button>
      </div>
    </div>
    )
}