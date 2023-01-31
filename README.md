# Projekt i Fullstacks-utveckling med ramverk (DT193G)
I detta repository finns källkodsfiler för en klientapplikation som är tänkt att användas för ett fiktivt företag som säljer garn för lagerföring och information av produkterna till en webbshop. Webbplatsen är skapad med hjälp av JavaScript-ramverket Vue och konsumerar data från en webbtjänst som också skapades under samma projekt med hjälp av PHP-ramverket Laravel. Det finns funktionalitet för att både skapa, läsa, uppdatera och radera produkter, kategorier och märken. För kategorier och märken finns det även möjlighet att specifikt hämta de produkter som tillhör en kategori eller ett märke. På webbplatsen har jag också använt mig av CSS-ramverket Bootstrap.

## Länk till webbplats
https://garnbollen.netlify.app/

## Klientapplikation
Roten App innehåller komponenten RouterView och utgör grunden för webbplatsen. Härifrån kan man nås vyerna LoginView och RegisterView. Vid inloggning slussas man vidare till vyn Dashboard som i sin tur innehåller komponenten Header och en nestad RouterView. Genom den nestade routerview renderas alla vyer som kan ses i inloggat läge.

### Views
- **LoginView**: Innehåller företagets stora logotyp och komponenten LoginForm.
- **Register View**: Innehåller företages stora logotyp och komponenten RegisterForm.
- **Dashboard**: Innehåller komponenten Header och en router view. Här finns det en metod som i sin tur anropar metoder i komponenten Header.
- **HomeView**: Innehåller komponenterna BaseButton, för snabbåtkomst för att lägga till, och ProductCard, för att skriva ut de sex senast tillagda proudukterna. Här finns det metod för att hämta alla produkter.
- **ProductListView**: Innehåller komponenten ProductCard, här skrivs alla produkter ut med den första högst upp och den senaste längst ner. Här finns det metod för att hämta alla produkter.
- **AddProductView**: Innehåller komponenten ProductForm för att lägga till ny produkt.
- **UpdateProductView**: Innehåller komponenten UpdateProductForm för att uppdatera information om produkten. Här finns metod för att hämta information om en specifik produkt.
- **ProductView**: Innehåller information om enskild produkt och komponenten BaseButton och SubmitButton. BaseButton används för att hantera produkten (ändra och radera) och SubmitButton används för att skicka uppdaterad information om saldo. Här finns det metoder för att hämta information om en specifik produkt, ändra produkt och radera produkt.
- **CategoryListView**: Innehåller komponenterna SmallForm och SmallTable för att kunna lägga till kategori samt utskrift av alla kategorier i en tabell. Här finns det metoder för att hämta alla kategorier och hantera emits.
- **UpdateCategoryView**: Innehåller komponenten UpdateSmallForm för att ändra namn på kategori. Här finns metod för att hämta information om en specifik kategori.
- **CategoryView**: Innehåller komponenten ProductCard som skriver ut alla produkter i en specifik kategori. Här finns metoder för att hämta information om en specifik kategori samt hämta produkter i den kategorin.
- **BrandListView**: Innehåller komponenterna SmallForm och SmallTable för att kunna lägga till märken samt utskrift av märken i en tabell. Här finns metod för att hämta alla märken och hantera emits.
- **UpdateBrandView**: Innehåller komponenten UpdateSmallForm för att ändra namn på märke. Här finns metod för att hämta information om ett specifikt märke.
- **BrandView**: Innehåller komponenten ProductCard som skriver ut alla produkter för ett specifik märke. Här finns metoder för att hämta information om ett specifikt märke samt hämta produkter för det märket.

Dessa views hanteras med hjälp av en så kallad router, index.js.

### Komponenter
- **BaseInput**: Består av ett label-element och ett input-element. Genom props kan man välja text för label, id på input för att koppla till label, typ av input och namn på v-model.
- **BaseSelect**: Består av ett label-element och ett select-element vars options hämtas från databasen. Genom props kan man välja text för label, text för disabeld option, id på select för att koppla till label och namn på v-model samt skicka med vad som ska skrivas ut i options.
- **BaseTextarea**: Består av ett label-element och ett select-element vars options hämtas från databasen. Genom props kan man välja text för label, id på input för att koppla till textarea och namn på v-model.
- **SubmitButton**: Består av ett input-element. Genom props kan man välja text på knappen.
- **LoginForm**: Består av ett form-element där det inkluderas två olika typer av BaseInput-komponenter och en SubmitButton-komponent. Här finns metod för att logga in användare.
- **RegisterForm**: Består av ett form-element där det inkluderas tre olika typer av BaseInput-komponenter och en SubmitButton-komponent. Här finns metod för att registrera användare.
- **ProductForm**: Består av ett form-element där det inkluderas fyra BaseInput-komponenter av två olika typer, två BaseSelect-komponenter, en BaseTextarea-komponent och en SubmitButton-komponent. Här finns metoder för att hämta alla kategorier och märken samt lägga till produkt.  
- **SmallForm**: Består av ett form-element där det inkluderas en BaseInput-komponent och en SubmitButton-komponent. Här finns metoder för att lägga till kategorier och märken samt en metod för att avgöra vilken av de tidigare metoderna som ska anropas.
- **UpdateProductForm**: Består av samma komponenter som ProductForm. Här finns metoder för att hämta kategorier och märken samt uppdatera produkt.
- **UpdateSmallForm**: Består av samma komponenter som SmallForm. Här finns metoder för att uppdatera kategorier och märken samt en metod för att avgöra vilken av de tidigare metoderna som ska anropas.
- **SmallTable**: Består av ett table-element där det inkluderas två BaseButton-komponenter. Här finns metoder för att radera kategori och märke.
- **NavbarDropdown**: Består av ett li-element som i sin tur innehåller en länk och en nestad lista med länkar. Med props kan man välja vilken text det ska stå på länken som klickas på för att få fram listan, skicka med vad som ska skrivas ut i listan och vilken vy de länkarna ska använda samt text för vad man vill ska länka till separat längst ner och namnet på den vyn.
- **Header**: Består av ett header-element i vilket det sedan finns ett nav-element där det inkluderas två NavbarDropdown-komponenter och en BaseButton-komponent. Här finns metoder för att hämta kategorier och märken samt logga ut användare.
- **ProductCard**: Består av ett div-element med olika text-element och ett list-element. Genom props kan man skicka med ett objekt vars innehåll sedan skrivs ut i kortet.
- **BaseButton**: Består av ett button-element. Genom props kan man skicka med vad det ska stå på knappen.

Följande komponent finns med bland mina filer men används inte:
- **ProductTable**: Består av ett table-element där det inkluderas två BaseButton-komponenter. Här finns metod för att radera produkt.

## Om repositoriet
Skapat av Sofia Widholm 2022

Fullstackutveckling med ramverk, Webbutvecklingsprogrammet, Mittuniversitetet
