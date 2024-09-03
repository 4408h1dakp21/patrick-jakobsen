const FeaturesSection = () => {
    return ( <div className="flex flex-col gap-4 w-full px-4 mt-12">
        <h1 className="text-3xl font-normal">Enjoy Quality Life In House´s Housing</h1>
        <p className="text-sm font-light text-muted-foreground text-left text-pretty">House´s Housing is a Real Estate Agency that provides a wide range of services to help you find the perfect home, sell your current home, or manage your property, all in one place. We are a team of experienced real estate professionals who are dedicated to helping you achieve your real estate goals. Let us help you find your dream home or sell your current home. Take a look at our services and find the one that best suits your needs.</p>

        <div className="w-full items-center gap-10 flex justify-start mt-5">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-normal">+100</h1>
                <p className="text-sm font-light text-muted-foreground text-left">Properties</p>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-normal">+60k</h1>
                <p className="text-sm font-light text-muted-foreground text-left">Customers</p>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-normal">+70k</h1>
                <p className="text-sm font-light text-muted-foreground text-left">Reviews</p>
            </div>
        </div>
    </div> );
}

export default FeaturesSection;
