import SkeletonMazouCard from './SkeletonMazouCard'

export default function SkeletonMazouList() {
  return (
    <>
      <div className="mz_container-body px-3">
        <div className="w-full gap-x-1 gap-y-3 md:gap-3 items-center grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonMazouCard key={i} />
          ))}
        </div>
      </div>
    </>
  )
}
