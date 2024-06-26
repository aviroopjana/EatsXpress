import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  isHomePage?: boolean;
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  isHomePage,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    console.log("Resetting form with searchQuery:", searchQuery);
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-center max-w-3xl mx-auto flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        } focus-within:ring-2 ${isHomePage ? 'border-orange-600 focus-within:ring-orange-600' : 'border-orange-800 focus-within:ring-orange-500'}`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className={`border-none shadow-none text-xl focus-visible:ring-0 ${
                    isHomePage
                      ? "text-white placeholder:text-white"
                      : "text-black placeholder:text-slate-800"
                  }`}
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500 hover:bg-orange-700">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
