import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Image from "next/image";
import { forwardRef } from "react";

const QtProjects = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>   
      <Card>
        <h1>Qt projects I have worked on</h1>
        <p>I have been using Qt for a while. It is a extremely powerful framework which provides GUI features and much more. I find it very complete and easy to use. It has three big language APIs: C++, QML and Python.
I love the Python bindings of the C++ API, which are called <q>PySide</q>. The combination of the capabilities of Qt and the development speed of Python is amazing. I have little experience with C++ as I prefer using Python. I would like to learn QML in-depth.</p>
      </Card>
      <Card>
        <h1>During my second year of university, I coded a QuickSort algorithm simulation using PySide6. That way I learned how QuickSort works and I helped my classmates to achieve the same goal. The result shows a gorgeous animation</h1> 
        <Image src="/images/QtQuickSort.gif" unoptimized width="200" height="200" alt="Quick sort algorithm animation" className="select-none" draggable="false" priority={true}/>
      </Card>
    </CardsLayout>
  );
});

QtProjects.displayName = "Qt projects";
export default QtProjects;