import csv

from django.core.management.base import BaseCommand
from faker import Faker
from faker.providers.phone_number import Provider as PhoneNumberProvider


class TanzanianPhoneProvider(PhoneNumberProvider):

    formats = (
        '+25571#######',
    )


class Command(BaseCommand):
    help = "Generate contacts for use during testing"

    headers = ['Name', 'Phone Number', 'Village', 'farmer_service']

    def add_arguments(self, parser):
        parser.add_argument(
            'output',
            nargs='+',
            type=str,
        )

    def generate_contact(self, village, is_farmer=False, is_worker=False):
        return [
            self.fake.name(),
            self.fake.phone_number(),
            village['name'],
            village['farmer_service'],
        ]

    def handle(self, output, *args, **options):
        self.fake = Faker('en_GB')
        self.fake.add_provider(TanzanianPhoneProvider)

        farmers_per_village = 20
        workers_per_village = 100

        contacts = []

        villages = [
            {
                'name': 'Village 1',
                'farmer_service': 'SVb777ddfa40b2afcf'
            },
            {
                'name': 'Village 2',
                'farmer_service': 'SVb777ddfa40b2afcf',
            }
        ]

        for village in villages:
            for f in range(farmers_per_village):
                contacts.append(self.generate_contact(village, is_farmer=True))

            for f in range(workers_per_village):
                contacts.append(self.generate_contact(village, is_worker=True))

        with open(output[0], 'w') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(self.headers)
            writer.writerows(contacts)
