import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-[#0f0f0f] text-white">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Built to cover your needs</h2>
                    <p className="mt-4 text-zinc-400">Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.</p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y divide-zinc-800 overflow-hidden shadow-lg shadow-black/40 border border-zinc-800 md:mt-16 bg-[#141414]">
                    <div className="group ">
                        <CardHeader className="pb-3  text-white hover:text-[#f93535]">
                            <CardDecorator>
                                <Zap className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Customizable</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">Extensive customization options, allowing you to tailor every aspect to meet your specific needs.</p>
                        </CardContent>
                    </div>

                    <div className="group">
                        <CardHeader className="pb-3  text-white hover:text-[#f93535]">
                            <CardDecorator>
                                <Settings2 className="size-6 " aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">You have full control</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-3 text-sm text-zinc-400">From design elements to functionality, you have complete control to create a unique and personalized experience.</p>
                        </CardContent>
                    </div>

                    <div className="group">
                        <CardHeader className="pb-3  text-white hover:text-[#f93535]">
                            <CardDecorator>
                                <Sparkles className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Powered By AI</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-3 text-sm text-zinc-400">Elements to functionality, you have complete control to create a unique experience.</p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    )
}
const CardDecorator = ({ children }) => (
  <div className="relative mx-auto size-36 duration-300 
    [--color-border:color-mix(in_oklab,white_15%,#0f0f0f)] 
    group-hover:[--color-border:color-mix(in_oklab,#f93535_40%,#0f0f0f)]">
    
    {/* grid pattern with dramatic fade */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]"
    />

    {/* radial hover glow synced with fade */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
        bg-[radial-gradient(circle_at_center,rgba(249,53,53,0.45)_0%,transparent_60%)]"
    />

    {/* inner box */}
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-zinc-700 bg-[#0f0f0f] rounded-md">
      {children}
    </div>
  </div>
)
